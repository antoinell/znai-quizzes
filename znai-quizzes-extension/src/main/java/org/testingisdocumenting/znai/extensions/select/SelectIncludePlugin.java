package org.testingisdocumenting.znai.extensions.select;

import com.jayway.jsonpath.JsonPath;
import org.testingisdocumenting.znai.core.AuxiliaryFile;
import org.testingisdocumenting.znai.core.ComponentsRegistry;
import org.testingisdocumenting.znai.extensions.PluginParams;
import org.testingisdocumenting.znai.extensions.PluginParamsDefinition;
import org.testingisdocumenting.znai.extensions.PluginParamsOpts;
import org.testingisdocumenting.znai.extensions.PluginResult;
import org.testingisdocumenting.znai.extensions.include.IncludePlugin;
import org.testingisdocumenting.znai.parser.ParserHandler;
import org.testingisdocumenting.znai.search.SearchScore;
import org.testingisdocumenting.znai.search.SearchText;

import java.nio.file.Path;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Stream;

public class SelectIncludePlugin implements IncludePlugin {
    private Path selectPath;
    private String jsonText;

    @Override
    public String id() {
        return "select";
    }

    @Override
    public IncludePlugin create() {
        return new SelectIncludePlugin();
    }

    @Override
    public PluginParamsDefinition parameters() {
        return SelectPluginParams.definition;
    }

    @Override
    public PluginResult process(ComponentsRegistry componentsRegistry, ParserHandler parserHandler, Path markupPath, PluginParams pluginParams) {
        selectPath = componentsRegistry.resourceResolver().fullPath(pluginParams.getFreeParam());
        jsonText = componentsRegistry.resourceResolver().textContent(selectPath);

        Map<String, Object> props = new LinkedHashMap<>(pluginParams.getOpts().toMap());
        props.put("options", JsonPath.read(jsonText, "$"));
        PluginParamsOpts opts = pluginParams.getOpts();
        Map<String, String> selectedOption = opts.get("selectedOption");
        props.put("selectedOption", selectedOption);
        return PluginResult.docElement("ZnaiSelect", props);
    }

    @Override
    public Stream<AuxiliaryFile> auxiliaryFiles(ComponentsRegistry componentsRegistry) {
        return Stream.of(AuxiliaryFile.builtTime(selectPath));
    }

    @Override
    public List<SearchText> textForSearch() {
        return List.of(SearchScore.STANDARD.text(this.jsonText));
    }

}
